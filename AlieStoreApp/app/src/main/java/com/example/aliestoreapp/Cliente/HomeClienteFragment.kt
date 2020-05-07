package com.example.aliestoreapp.Cliente

import android.os.Bundle
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.*
import com.android.volley.Request
import com.android.volley.Response
import com.android.volley.toolbox.JsonArrayRequest
import com.android.volley.toolbox.Volley
import com.example.aliestoreapp.Datos
import com.example.aliestoreapp.Modelos.Busquedad_Adapte
import com.example.aliestoreapp.Modelos.ListBusquedad
import com.example.aliestoreapp.R
import com.google.gson.GsonBuilder
import org.json.JSONArray
import org.json.JSONObject


/**
 * A simple [Fragment] subclass.
 */
class HomeClienteFragment : Fragment() {

    private val API_URL = "http://192.168.1.79:3000/api"

    private lateinit var Lista: ListView

    companion object {
        fun newInstance(): HomeClienteFragment = HomeClienteFragment()
    }

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        // Inflate the layout for this fragment
        val view = inflater.inflate(R.layout.fragment_home_cliente, container, false)

        val btn = view.findViewById<ImageButton>(R.id.btn_buscar)

        val txt = view.findViewById<EditText>(R.id.txt_bus)

        Lista = view.findViewById<ListView>(R.id.view_busquedad)



        btn.setOnClickListener {
            if(txt.text.toString() != ""){
                Buscar(txt.text.toString(),view)

            }

        }

        return view
    }

    private fun Buscar(palabra: String, view: View){

        val queue = Volley.newRequestQueue(activity)

        var url = this.API_URL+ "/producto/appBuscar"

        val jsonObject = JSONObject()
        jsonObject.put("producto","%$palabra%")

        val jsonArray = JSONArray()
        jsonArray.put(jsonObject)


        val req = JsonArrayRequest(
            Request.Method.POST,url,jsonArray,
            Response.Listener{ response ->

                val stringJson = response.toString()
                val gson = GsonBuilder().create()
                val model = gson.fromJson(stringJson, Array<Datos.Busquedad>::class.java).toList()

                var itemList: ArrayList<ListBusquedad> = ArrayList()

                for (i in 0 until model.size) {
                    val recipe = model[i]
                    var user = ListBusquedad(recipe.CANTIDAD_DISPONIBLE,recipe.DESCRIPCION,recipe.PRECIO_PRODUCTO)
                    itemList.add(user)
                }

                val adapter = Busquedad_Adapte(view,itemList)
                (Lista as ListView).adapter = adapter


            },
            Response.ErrorListener { error ->
                error.printStackTrace()

                Toast.makeText(activity, "Error 404", Toast.LENGTH_SHORT).show()
            }
        )


        queue.add(req)

    }

}
