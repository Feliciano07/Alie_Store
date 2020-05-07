package com.example.aliestoreapp.Modelos

import android.content.Context
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.BaseAdapter
import android.widget.TextView
import com.example.aliestoreapp.Datos
import com.example.aliestoreapp.R

class Busquedad_Adapte(private  val view: View, busquedad_lista: List<ListBusquedad>):BaseAdapter() {

    private  var Lista = ArrayList<ListBusquedad>()

    override fun getView(position: Int, convertView: View?, parent: ViewGroup?): View {
        var vi: View? = convertView
        val inflater = this.view.context.getSystemService(Context.LAYOUT_INFLATER_SERVICE) as LayoutInflater
        vi = inflater.inflate(R.layout.list_busquedad,null)


        val desc = vi.findViewById<TextView>(R.id.txt_descripcion)
        val precio = vi.findViewById<TextView>(R.id.txt_precio)
        val dispon = vi.findViewById<TextView>(R.id.txt_disponible)

        desc.text = Lista[position].DESCRIPCION
        precio.text= Lista[position].PRECIO_PRODUCTO.toString()
        dispon.text = Lista[position].CANTIDAD_DISPONIBLE.toString()
        return vi
    }

    override fun getItem(position: Int): Any {
        return position
    }

    override fun getItemId(position: Int): Long {
        return  position.toLong()
    }

    override fun getCount(): Int {
        return  this.Lista.size
    }

    init {
        this.Lista = busquedad_lista as ArrayList
    }
}