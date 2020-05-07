package com.example.aliestoreapp.fragments

import android.os.Bundle
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup

import com.example.aliestoreapp.R

/**
 * A simple [Fragment] subclass.
 */
class RegistroFragment : Fragment() {

    companion object{
        fun newInstance(): RegistroFragment = RegistroFragment();
    }

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        // Inflate the layout for this fragment
        return inflater.inflate(R.layout.fragment_registro, container, false)
    }

}
