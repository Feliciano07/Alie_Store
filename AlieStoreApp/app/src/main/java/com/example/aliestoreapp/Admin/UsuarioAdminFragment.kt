package com.example.aliestoreapp.Admin

import android.os.Bundle
import android.util.Log
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.ArrayAdapter
import android.widget.ListView

import android.widget.Toast
import com.android.volley.Request
import com.android.volley.Response
import com.android.volley.toolbox.JsonArrayRequest
import com.android.volley.toolbox.JsonObjectRequest
import com.android.volley.toolbox.Volley
import com.example.aliestoreapp.Datos
import com.example.aliestoreapp.Modelos.ListUsuario
import com.example.aliestoreapp.Modelos.Usuario_Adapte


import com.example.aliestoreapp.R
import com.google.gson.GsonBuilder


/**
 * A simple [Fragment] subclass.
 */
class UsuarioAdminFragment : Fragment() {

    private val API_URL = "http://192.168.1.79:3000/api"

    private lateinit var Lista: ListView


    companion object {
        fun newInstance(): UsuarioAdminFragment = UsuarioAdminFragment()
        val LOG_TAG = "kiko"
    }

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        // Inflate the layout for this fragment
        val view: View= inflater.inflate(R.layout.fragment_usuario_admin, container, false)

        this.Lista = view.findViewById<ListView>(R.id.listaUser)


        ObtenerUsuarios(view)

        return view
    }


    private fun ObtenerUsuarios(view: View){
        val queue = Volley.newRequestQueue(activity)

        val url = this.API_URL+"/admin/listar";


        val req = JsonArrayRequest(
            Request.Method.GET,url,null,
            Response.Listener{ response ->

                val stringJson = response.toString()
                val gson = GsonBuilder().create()
                val model = gson.fromJson(stringJson, Array<Datos.Usuario>::class.java).toList()

                var itemList: ArrayList<ListUsuario> = ArrayList()

                for (i in 0 until model.size) {
                    val recipe = model[i]
                    var user = ListUsuario("Nombre: "+recipe.NOMBRE,"Correo: "+recipe.CORREO)
                    itemList.add(user)
                }

                val adapter = Usuario_Adapte(view,itemList)
                (Lista as ListView).adapter = adapter


            },
            Response.ErrorListener { error ->
                error.printStackTrace()

                Toast.makeText(activity, "Error 404", Toast.LENGTH_SHORT).show()
            }
        )

        // Add the request to the RequestQueue.
        queue.add(req)
    }




}
