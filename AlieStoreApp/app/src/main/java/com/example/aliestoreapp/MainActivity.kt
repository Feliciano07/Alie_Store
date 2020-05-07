package com.example.aliestoreapp

import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import androidx.fragment.app.Fragment
import com.example.aliestoreapp.fragments.HomeFragment
import com.example.aliestoreapp.fragments.LoginFragment
import com.example.aliestoreapp.fragments.RegistroFragment
import kotlinx.android.synthetic.main.activity_main.*

class MainActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        navigation_main.setOnNavigationItemSelectedListener { menuItem ->
            when (menuItem.itemId) {
                R.id.action_home -> {
                    val fragment = HomeFragment.newInstance()
                    openFragment(fragment)
                    true
                }
                R.id.action_login -> {
                    val fragment = LoginFragment.newInstance()
                    openFragment(fragment)
                    true
                }
                R.id.action_registro -> {
                    val fragment = RegistroFragment.newInstance();
                    openFragment(fragment)
                    true
                }
                else -> false
            }
        }

        // fragment por defecto
        navigation_main.selectedItemId = R.id.action_home
    }

    private fun openFragment(fragment: Fragment) {
        val transaction = supportFragmentManager.beginTransaction()
        transaction.replace(R.id.container, fragment)
        transaction.addToBackStack(null)
        transaction.commit()
    }
}
