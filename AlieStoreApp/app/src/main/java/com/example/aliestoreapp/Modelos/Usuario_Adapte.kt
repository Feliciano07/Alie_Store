package com.example.aliestoreapp.Modelos

import android.content.Context
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.BaseAdapter
import android.widget.TextView
import com.example.aliestoreapp.R
import java.util.ArrayList

class Usuario_Adapte(private val view: View, usuarioLista: List<ListUsuario>):BaseAdapter() {

    private  var Lista = ArrayList<ListUsuario>()

    override fun getView(position: Int, convertView: View?, parent: ViewGroup?): View {
        var vi: View? = convertView
        val inflater = this.view.context.getSystemService(Context.LAYOUT_INFLATER_SERVICE) as LayoutInflater
        vi = inflater.inflate(R.layout.list_view,null)
        val nombre = vi.findViewById<TextView>(R.id.list_nombre)
        val correo = vi.findViewById<TextView>(R.id.list_correo)
        nombre.text = Lista[position].nombre
        correo.text = Lista[position].correo
        return vi
    }

    override fun getItem(position: Int): Any {
        return  position
    }

    override fun getItemId(position: Int): Long {
        return position.toLong()
    }

    override fun getCount(): Int {
        return this.Lista.size
    }

    init {
        this.Lista = usuarioLista as ArrayList
    }
}