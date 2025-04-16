package com.agrisuro.fragments;

import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import com.agrisuro.R;
import com.agrisuro.adapters.ForecastAdapter;
import com.agrisuro.model.WeatherData;

import java.util.ArrayList;
import java.util.List;

public class ForecastWeatherFragment extends Fragment {

    private RecyclerView forecastRecyclerView;
    private ForecastAdapter forecastAdapter;

    @Nullable
    @Override
    public View onCreateView(@NonNull LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {
        View view = inflater.inflate(R.layout.layout_forecast_weather, container, false);

        // Initialize forecast recycler view
        forecastRecyclerView = view.findViewById(R.id.recycler_forecast);
        forecastRecyclerView.setLayoutManager(new LinearLayoutManager(getContext()));

        // Load mock forecast data
        List<WeatherData.Forecast> forecastList = getMockForecastData();
        forecastAdapter = new ForecastAdapter(forecastList);
        forecastRecyclerView.setAdapter(forecastAdapter);

        return view;
    }

    private List<WeatherData.Forecast> getMockForecastData() {
        List<WeatherData.Forecast> forecastList = new ArrayList<>();

        // Today
        WeatherData.Forecast today = new WeatherData.Forecast();
        today.setDay("Today");
        today.setTemperature(32);
        today.setCondition("Cloudy");
        today.setRainfall(0.5f);
        forecastList.add(today);

        // Tomorrow
        WeatherData.Forecast tomorrow = new WeatherData.Forecast();
        tomorrow.setDay("Tomorrow");
        tomorrow.setTemperature(33);
        tomorrow.setCondition("Sunny");
        tomorrow.setRainfall(0);
        forecastList.add(tomorrow);

        // Wednesday
        WeatherData.Forecast wednesday = new WeatherData.Forecast();
        wednesday.setDay("Wednesday");
        wednesday.setTemperature(31);
        wednesday.setCondition("Cloudy");
        wednesday.setRainfall(2);
        forecastList.add(wednesday);

        // Thursday
        WeatherData.Forecast thursday = new WeatherData.Forecast();
        thursday.setDay("Thursday");
        thursday.setTemperature(29);
        thursday.setCondition("Rainy");
        thursday.setRainfall(15);
        forecastList.add(thursday);

        // Friday
        WeatherData.Forecast friday = new WeatherData.Forecast();
        friday.setDay("Friday");
        friday.setTemperature(30);
        friday.setCondition("Cloudy");
        friday.setRainfall(5);
        forecastList.add(friday);

        return forecastList;
    }
}
