package com.example.aliestoreapp.fragments

import android.content.Intent
import android.os.Bundle
import android.util.Log
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Button
import android.widget.EditText
import android.widget.Toast
import com.android.volley.Request
import com.android.volley.Response
import com.android.volley.toolbox.JsonObjectRequest
import com.android.volley.toolbox.Volley
import com.example.aliestoreapp.AdminActivity

import com.example.aliestoreapp.ClienteActivity
import com.example.aliestoreapp.Datos
import com.example.aliestoreapp.R
import com.google.gson.Gson
import org.json.JSONObject



/**
 * A simple [Fragment] subclass.
 */
class LoginFragment : Fragment() {

    private val API_URL = "http://192.168.1.79:3000/api";



    companion object {
        fun newInstance(): LoginFragment = LoginFragment()
        val LOG_TAG = "kiko"
    }




    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        // Inflate the layout for this fragment
        val view = inflater.inflate(R.layout.fragment_login, container, false)

        val btnLogin = view.findViewById<Button>(R.id.btnLogin)

        val correo = view.findViewById<EditText>(R.id.txtCorreo)
        val pass = view.findViewById<EditText>(R.id.clave)

        btnLogin.setOnClickListener {
            Solicitar_Usuario(correo.text.toString(),pass.text.toString())

        }


        return  view
    }




    private  fun Solicitar_Usuario(correo: String, clave:String){
        // Instantiate the RequestQueue.(cola de peticiones)

        val queue = Volley.newRequestQueue(activity)

        val url = this.API_URL+"/usuario/login";

        // json que se manda
        val jsonObject = JSONObject()
        jsonObject.put("correo", correo)
        jsonObject.put("clave", clave)



        val req = JsonObjectRequest(
            Request.Method.POST,url,jsonObject,
            Response.Listener{ response ->


                var stringR = response.toString()


                val user:Datos.Usuario = Gson().fromJson(stringR,Datos.Usuario::class.java)

                if(user.TIPO_USUARIO == 0){    // tipo admin
                    Toast.makeText(activity, "Es amin", Toast.LENGTH_SHORT).show()
                    val intent = Intent(activity, AdminActivity::class.java)
                    intent.putExtra("usuario",stringR)
                    startActivity(intent)

                }else{ // tipo ayuda o cliente normal
                    Toast.makeText(activity, "No es Admin", Toast.LENGTH_SHORT).show()
                    val intent = Intent(activity, ClienteActivity::class.java)
                    intent.putExtra("usuario",stringR)
                    startActivity(intent)

                }
            },
            Response.ErrorListener { error ->
                error.printStackTrace()
                Log.e(LOG_TAG, "That didn't work!")
                Toast.makeText(activity, "Credenciales Invalidas", Toast.LENGTH_SHORT).show()
            }
        )

        // Add the request to the RequestQueue.
        queue.add(req)
    }


}
