package middleware

import (
	"context"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"os"
	"path/filepath"
	"strconv"
	"time"
	dto "waysGallery/dto/result"

	"github.com/golang-jwt/jwt/v4"
)

// membuat middleware untuk menghandle upload file
func UpdateUserImage(next http.HandlerFunc) http.HandlerFunc {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		// Handling dan parsing data dari form data yang ada data file nya. Argumen 1024 pada method tersebut adalah maxMemory
		if err := r.ParseMultipartForm(1024); err != nil {
			panic(err.Error())
		}

		// mengambil id user dari url
		// id := mux.Vars(r)["id_user"]
		claims := r.Context().Value("userInfo").(jwt.MapClaims)
		id := strconv.Itoa(int(claims["id"].(float64)))

		// mengambil file dari form
		uploadedFile, handler, err := r.FormFile("image")
		if err != nil {
			w.WriteHeader(http.StatusBadRequest)
			response := dto.ErrorResult{
				Code:    http.StatusBadRequest,
				Message: "Please upload a JPG, JPEG or PNG image",
			}
			json.NewEncoder(w).Encode(response)
			return
		}
		defer uploadedFile.Close()

		// cek isi handler
		// fmt.Println("uploadedFile", uploadedFile)

		// Apabila format file bukan .jpg, .jpeg atau .png, maka tampilkan error
		if filepath.Ext(handler.Filename) != ".jpg" && filepath.Ext(handler.Filename) != ".jpeg" && filepath.Ext(handler.Filename) != ".png" {
			w.WriteHeader(http.StatusBadRequest)
			response := dto.ErrorResult{
				Code:    http.StatusBadRequest,
				Message: "The provided file format is not allowed. Please upload a JPG, JPEG or PNG image",
			}
			json.NewEncoder(w).Encode(response)
			return
		}

		// cek isi handler
		// fmt.Println("handler", handler)
		// fmt.Println("handler.Filename", handler.Filename)

		// mengambil direktori aktif
		dir, err := os.Getwd()
		if err != nil {
			panic(err.Error())
		}

		// menyusun string untuk digunakan sebagai nama file gambar
		random := strconv.FormatInt(time.Now().UnixNano(), 10)
		filenameStr := id + "-" + random

		// memberi nama pada file gambar
		filename := fmt.Sprintf("%s%s", filenameStr, filepath.Ext(handler.Filename))
		// fmt.Println(filename)

		// menentukan lokasi file
		fileLocation := filepath.Join(dir, "uploads/img", filename)
		// fmt.Println(fileLocation)

		// membuat file baru yang menjadi tempat untuk menampung hasil salinan file upload
		targetFile, err := os.OpenFile(fileLocation, os.O_WRONLY|os.O_CREATE, 0666)
		if err != nil {
			panic(err.Error())
		}
		defer targetFile.Close()

		// Menyalin file hasil upload, ke file baru yang menjadi target
		if _, err := io.Copy(targetFile, uploadedFile); err != nil {
			panic(err.Error())
		}

		// membuat sebuah context baru dengan menyisipkan value di dalamnya, valuenya adalah filepath (loaksi file) dari file yang diupload
		// ctx := context.WithValue(r.Context(), UploadFileID, filepath)
		ctx := context.WithValue(r.Context(), "userImage", fileLocation)

		// mengirim nilai context ke object http.HandlerFunc yang menjadi parameter saat fungsi middleware ini dipanggil
		next.ServeHTTP(w, r.WithContext(ctx))
	})
}
