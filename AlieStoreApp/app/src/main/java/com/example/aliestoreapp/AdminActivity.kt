package com.example.aliestoreapp

import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.util.Log
import androidx.fragment.app.Fragment
import com.example.aliestoreapp.Admin.HomeAdminFragment
import com.example.aliestoreapp.Admin.PerfilAdminFragment
import com.example.aliestoreapp.Admin.UsuarioAdminFragment
import com.google.gson.Gson
import kotlinx.android.synthetic.main.activity_admin.*


class AdminActivity : AppCompatActivity() {

    private lateinit var user: String

    companion object {
        val LOG_TAG = "kiko"
    }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_admin)

        val intent: Intent = intent
        this.user = intent.getStringExtra("usuario")




        navigation_admin.setOnNavigationItemSelectedListener { menuItem ->
            when (menuItem.itemId) {
                R.id.admin_home -> {
                    val fragment = HomeAdminFragment.newInstance()
                    openFragment(fragment)
                    true
                }
                R.id.admin_user -> {
                    val fragment = UsuarioAdminFragment.newInstance()
                    openFragment(fragment)
                    true
                }
                R.id.admin_perfil -> {
                    val fragment = PerfilAdminFragment.newInstance()

                    val bundle =Bundle()
                    bundle.putString("usuario", user)

                    fragment.arguments= bundle // envio de datos fragment

                    openFragment(fragment)
                    true
                }
                else -> false
            }
        }
        navigation_admin.selectedItemId = R.id.admin_home

    }

    private fun openFragment(fragment: Fragment) {
        val transaction = supportFragmentManager.beginTransaction()
        transaction.replace(R.id.container_admin, fragment)
        transaction.addToBackStack(null)
        transaction.commit()
    }

}
