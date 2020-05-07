package com.example.aliestoreapp.Cliente

import android.os.Bundle
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.ListView
import android.widget.Toast
import com.android.volley.Request
import com.android.volley.Response
import com.android.volley.toolbox.JsonArrayRequest
import com.android.volley.toolbox.JsonObjectRequest
import com.android.volley.toolbox.Volley
import com.example.aliestoreapp.Datos
import com.example.aliestoreapp.Modelos.ListaProducto
import com.example.aliestoreapp.Modelos.Producto_Adapte

import com.example.aliestoreapp.R
import com.google.gson.Gson
import com.google.gson.GsonBuilder
import org.json.JSONArray
import org.json.JSONObject

/**
 * A simple [Fragment] subclass.
 */
class ProductosClienteFragment : Fragment() {

    private val API_URL = "http://192.168.1.79:3000/api"

    private lateinit var Lista: ListView

    companion object {
        fun newInstance(): ProductosClienteFragment = ProductosClienteFragment()
    }

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        // Inflate the layout for this fragment
        val view = inflater.inflate(R.layout.fragment_productos_cliente, container, false)

        val args= arguments
        val Stringuser = args?.getString("usuario") // recibo de dato del fragment


        val user: Datos.Usuario = Gson().fromJson(Stringuser,Datos.Usuario::class.java)

        Lista = view.findViewById<ListView>(R.id.view_productos)

        Obtener_Productos(user.ID_USUARIO, view)


        return view
    }

    fun Obtener_Productos(codigo: Int?, view: View){
        val queue = Volley.newRequestQueue(activity)

        var url = this.API_URL+ "/producto/appObtener"



       val jsonObject = JSONObject()
       jsonObject.put("ID_USUARIO",codigo)

        val jsonArray = JSONArray()
        jsonArray.put(jsonObject)

        val req = JsonArrayRequest(
            Request.Method.POST,url,jsonArray,
            Response.Listener{ response ->

                val stringJson = response.toString()
                val gson = GsonBuilder().create()
                val model = gson.fromJson(stringJson, Array<Datos.Productos>::class.java).toList()

                var itemList: ArrayList<ListaProducto> = ArrayList()

                for (i in 0 until model.size) {
                    val recipe = model[i]
                    var user = ListaProducto(recipe.CANTIDAD_DISPONIBLE,recipe.DESCRIPCION,recipe.PRECIO_PRODUCTO,recipe.PADRE)
                    itemList.add(user)
                }

                val adapter = Producto_Adapte(view,itemList)
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
