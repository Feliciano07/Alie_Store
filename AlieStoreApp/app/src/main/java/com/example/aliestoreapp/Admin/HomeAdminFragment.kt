package com.example.aliestoreapp.Admin

import android.os.Bundle
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup

import com.example.aliestoreapp.R

/**
 * A simple [Fragment] subclass.
 */
class HomeAdminFragment : Fragment() {

    companion object {
        fun newInstance(): HomeAdminFragment = HomeAdminFragment()
    }

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        // Inflate the layout for this fragment
        return inflater.inflate(R.layout.fragment_home_admin, container, false)
    }

}
