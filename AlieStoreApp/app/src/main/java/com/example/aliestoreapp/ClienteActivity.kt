package com.example.aliestoreapp

import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.util.Log
import androidx.fragment.app.Fragment
import com.example.aliestoreapp.Cliente.HomeClienteFragment
import com.example.aliestoreapp.Cliente.PerfilClienteFragment
import com.example.aliestoreapp.Cliente.ProductosClienteFragment
import com.google.gson.Gson
import kotlinx.android.synthetic.main.activity_cliente.*

class ClienteActivity : AppCompatActivity() {

    private lateinit var user: Datos.Usuario

    companion object {
        val LOG_TAG = "kiko"
    }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_cliente)

        val intent: Intent = intent
        var stringU = intent.getStringExtra("usuario")


        navigation_cliente.selectedItemId = R.id.cliente_home

        navigation_cliente.setOnNavigationItemSelectedListener {
            menuItem ->
            when (menuItem.itemId) {
                R.id.cliente_home -> {
                    val fragment = HomeClienteFragment.newInstance()
                    openFragment(fragment)
                    true
                }
                R.id.cliente_productos -> {
                    val fragment = ProductosClienteFragment.newInstance()

                    val bundle =Bundle()
                    bundle.putString("usuario", stringU)
                    fragment.arguments= bundle // envio de datos fragment

                    openFragment(fragment)
                    true
                }
                R.id.cliente_perfil -> {
                    val fragment = PerfilClienteFragment.newInstance()

                    val bundle =Bundle()
                    bundle.putString("usuario", stringU)
                    fragment.arguments= bundle // envio de datos fragment

                    openFragment(fragment)
                    true
                }
                else -> false
            }
        }
    }

    private fun openFragment(fragment: Fragment) {
        val transaction = supportFragmentManager.beginTransaction()
        transaction.replace(R.id.container_cliente, fragment)
        transaction.addToBackStack(null)
        transaction.commit()
    }
}
