package com.agrisuro.adapters;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import com.agrisuro.R;
import com.agrisuro.model.WeatherData;

import java.util.List;

public class ForecastAdapter extends RecyclerView.Adapter<ForecastAdapter.ForecastViewHolder> {

    private List<WeatherData.Forecast> forecastList;

    public ForecastAdapter(List<WeatherData.Forecast> forecastList) {
        this.forecastList = forecastList;
    }

    @NonNull
    @Override
    public ForecastViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View view = LayoutInflater.from(parent.getContext())
                .inflate(R.layout.item_forecast_day, parent, false);
        return new ForecastViewHolder(view);
    }

    @Override
    public void onBindViewHolder(@NonNull ForecastViewHolder holder, int position) {
        WeatherData.Forecast forecast = forecastList.get(position);
        holder.bind(forecast);
    }

    @Override
    public int getItemCount() {
        return forecastList.size();
    }

    static class ForecastViewHolder extends RecyclerView.ViewHolder {
        private TextView dayTextView;
        private ImageView conditionImageView;
        private TextView temperatureTextView;
        private TextView conditionTextView;
        private TextView rainfallTextView;

        public ForecastViewHolder(@NonNull View itemView) {
            super(itemView);
            dayTextView = itemView.findViewById(R.id.text_day);
            conditionImageView = itemView.findViewById(R.id.image_weather_condition);
            temperatureTextView = itemView.findViewById(R.id.text_temperature);
            conditionTextView = itemView.findViewById(R.id.text_condition);
            rainfallTextView = itemView.findViewById(R.id.text_rainfall);
        }

        public void bind(WeatherData.Forecast forecast) {
            dayTextView.setText(forecast.getDay());
            temperatureTextView.setText(forecast.getTemperature() + "°C");
            conditionTextView.setText(forecast.getCondition());
            rainfallTextView.setText(forecast.getRainfall() + " mm");

            // Set weather icon based on condition
            switch (forecast.getCondition().toLowerCase()) {
                case "sunny":
                    conditionImageView.setImageResource(R.drawable.ic_sun);
                    break;
                case "cloudy":
                    conditionImageView.setImageResource(R.drawable.ic_cloud);
                    break;
                case "rainy":
                    conditionImageView.setImageResource(R.drawable.ic_rain);
                    break;
                default:
                    conditionImageView.setImageResource(R.drawable.ic_cloud);
                    break;
            }
        }
    }
}
