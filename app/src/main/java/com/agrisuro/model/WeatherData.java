package com.agrisuro.model;

import java.util.List;

public class WeatherData {
    private Current current;
    private List<Forecast> forecast;
    private List<Recommendation> recommendations;

    public static class Current {
        private double temperature;
        private int humidity;
        private double windSpeed;
        private String condition;
        private double rainfall;

        public Current() {
        }

        public Current(double temperature, int humidity, double windSpeed, String condition, double rainfall) {
            this.temperature = temperature;
            this.humidity = humidity;
            this.windSpeed = windSpeed;
            this.condition = condition;
            this.rainfall = rainfall;
        }

        public double getTemperature() {
            return temperature;
        }

        public void setTemperature(double temperature) {
            this.temperature = temperature;
        }

        public int getHumidity() {
            return humidity;
        }

        public void setHumidity(int humidity) {
            this.humidity = humidity;
        }

        public double getWindSpeed() {
            return windSpeed;
        }

        public void setWindSpeed(double windSpeed) {
            this.windSpeed = windSpeed;
        }

        public String getCondition() {
            return condition;
        }

        public void setCondition(String condition) {
            this.condition = condition;
        }

        public double getRainfall() {
            return rainfall;
        }

        public void setRainfall(double rainfall) {
            this.rainfall = rainfall;
        }
    }

    public static class Forecast {
        private String day;
        private double temperature;
        private String condition;
        private double rainfall;

        public Forecast() {
        }

        public Forecast(String day, double temperature, String condition, double rainfall) {
            this.day = day;
            this.temperature = temperature;
            this.condition = condition;
            this.rainfall = rainfall;
        }

        public String getDay() {
            return day;
        }

        public void setDay(String day) {
            this.day = day;
        }

        public double getTemperature() {
            return temperature;
        }

        public void setTemperature(double temperature) {
            this.temperature = temperature;
        }

        public String getCondition() {
            return condition;
        }

        public void setCondition(String condition) {
            this.condition = condition;
        }

        public double getRainfall() {
            return rainfall;
        }

        public void setRainfall(double rainfall) {
            this.rainfall = rainfall;
        }
    }

    public Current getCurrent() {
        return current;
    }

    public void setCurrent(Current current) {
        this.current = current;
    }

    public List<Forecast> getForecast() {
        return forecast;
    }

    public void setForecast(List<Forecast> forecast) {
        this.forecast = forecast;
    }

    public List<Recommendation> getRecommendations() {
        return recommendations;
    }

    public void setRecommendations(List<Recommendation> recommendations) {
        this.recommendations = recommendations;
    }
}
