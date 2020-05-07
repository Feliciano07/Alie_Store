package com.example.aliestoreapp.Modelos

class ListaProducto {
    var CANTIDAD_DISPONIBLE: Int = 0
    var DESCRIPCION: String = ""
    var PRECIO_PRODUCTO: Int = 0
    var CATEGORIA: String = ""

    constructor()

    constructor(dis: Int, Des: String, precio: Int, Cate: String){
        this.CANTIDAD_DISPONIBLE = dis
        this.DESCRIPCION = Des
        this.PRECIO_PRODUCTO = precio
        this.CATEGORIA = Cate
    }
}