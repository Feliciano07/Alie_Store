package com.example.aliestoreapp.Cliente

import android.os.Bundle
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.TextView
import com.example.aliestoreapp.Datos

import com.example.aliestoreapp.R
import com.google.gson.Gson

/**
 * A simple [Fragment] subclass.
 */
class PerfilClienteFragment : Fragment() {
    companion object {
        fun newInstance(): PerfilClienteFragment = PerfilClienteFragment()
    }

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        // Inflate the layout for this fragment
        val view =inflater.inflate(R.layout.fragment_perfil_cliente, container, false)

        val args= arguments
        val Stringuser = args?.getString("usuario") // recibo de dato del fragment


        val user: Datos.Usuario = Gson().fromJson(Stringuser,Datos.Usuario::class.java)

        val Pnombre = view.findViewById<TextView>(R.id.cliente_nombre)
        val Pcorreo = view.findViewById<TextView>(R.id.cliente_correo)
        val Papellido = view.findViewById<TextView>(R.id.cliente_ape)

        Pnombre.text = user.NOMBRE
        Pcorreo.text = user.CORREO
        Papellido.text = user.APELLIDO

        return view
    }

}
