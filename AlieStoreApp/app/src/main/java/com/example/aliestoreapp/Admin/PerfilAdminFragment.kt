package com.example.aliestoreapp.Admin

import android.os.Bundle
import android.text.Editable
import android.util.Log
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.EditText
import com.example.aliestoreapp.Datos

import com.example.aliestoreapp.R
import com.google.gson.Gson

/**
 * A simple [Fragment] subclass.
 */
class PerfilAdminFragment : Fragment() {

    private val user: String = ""

    companion object {
        fun newInstance(): PerfilAdminFragment = PerfilAdminFragment()
        val LOG_TAG = "kiko"
    }

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        // Inflate the layout for this fragment
        val view: View= inflater.inflate(R.layout.fragment_perfil_admin, container, false)


        val args= arguments
        val Stringuser = args?.getString("usuario") // recibo de dato del fragment

        Log.i(LOG_TAG,Stringuser)

        val user:Datos.Usuario = Gson().fromJson(Stringuser,Datos.Usuario::class.java)

        val Pnombre = view.findViewById<EditText>(R.id.A_user)
        val Pcorreo = view.findViewById<EditText>(R.id.A_correo)
        val Papellido = view.findViewById<EditText>(R.id.A_Apellido)

        Pnombre.text= Editable.Factory.getInstance().newEditable(user.NOMBRE)

        Pcorreo.text= Editable.Factory.getInstance().newEditable(user.CORREO)

        Papellido.text= Editable.Factory.getInstance().newEditable(user.APELLIDO)

        // ya mando a guarda en los text view y eso

        return view
    }

}
