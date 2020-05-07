package com.example.aliestoreapp.Modelos

class ListBusquedad {

    var CANTIDAD_DISPONIBLE: Int = 0
    var DESCRIPCION: String = ""
    var PRECIO_PRODUCTO: Int = 0

    constructor()

    constructor(dis: Int, Des: String, precio: Int){
        this.CANTIDAD_DISPONIBLE = dis
        this.DESCRIPCION = Des
        this.PRECIO_PRODUCTO = precio
    }
}