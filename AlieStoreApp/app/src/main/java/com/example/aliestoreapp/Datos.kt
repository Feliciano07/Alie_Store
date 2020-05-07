package com.example.aliestoreapp

class Datos  {

     data class  Usuario(
        val APELLIDO : String?,
        val CLASE_CLIENTE: Int?,
        val CLAVE: String?,
        val CORREO: String?,
        val CREDITO: Int?,
        val DIRECCION: String?,
        val FECHA_NACIMIENTO: String?,
        val FECHA_REGISTRO: String?,
        val FOTO: String?,
        val GANANCIA: Int?,
        val GENERO: Int?,
        val ID_USUARIO: Int?,
        val NOMBRE: String?,
        val STATUS: Int?,
        val TELEFONO: Int?,
        val TIPO_USUARIO: Int?
    )

   data class Busquedad(
    val CANTIDAD_DISPONIBLE: Int,
    val DESCRIPCION: String,
    val FECHA_PUBLICACION: String,
    val IMAGEN: String,
    val PRECIO_PRODUCTO: Int
)

    data class Productos(
    val CANTIDAD_DISPONIBLE: Int,
    val DESCRIPCION: String,
    val IMAGEN: String,
    val PADRE: String,
    val PRECIO_PRODUCTO: Int
)


}