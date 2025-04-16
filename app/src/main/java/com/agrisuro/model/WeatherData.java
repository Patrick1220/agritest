package com.agrisuro.model;

import java.util.List;

public class WeatherData {
    private Current current;
    private List<Forecast> forecast;
    private List<Recommendation> recommendations;

    public static class Current {
        private int temperature;
        private int humidity;
        private int windSpeed;
        private String condition;
        private float rainfall;

        public int getTemperature() {
            return temperature;
        }

        public void setTemperature(int temperature) {
            this.temperature = temperature;
        }

        public int getHumidity() {
            return humidity;
        }

        public void setHumidity(int humidity) {
            this.humidity = humidity;
        }

        public int getWindSpeed() {
            return windSpeed;
        }

        public void setWindSpeed(int windSpeed) {
            this.windSpeed = windSpeed;
        }

        public String getCondition() {
            return condition;
        }

        public void setCondition(String condition) {
            this.condition = condition;
        }

        public float getRainfall() {
            return rainfall;
        }

        public void setRainfall(float rainfall) {
            this.rainfall = rainfall;
        }
    }

    public static class Forecast {
        private String day;
        private int temperature;
        private String condition;
        private float rainfall;

        public String getDay() {
            return day;
        }

        public void setDay(String day) {
            this.day = day;
        }

        public int getTemperature() {
            return temperature;
        }

        public void setTemperature(int temperature) {
            this.temperature = temperature;
        }

        public String getCondition() {
            return condition;
        }

        public void setCondition(String condition) {
            this.condition = condition;
        }

        public float getRainfall() {
            return rainfall;
        }

        public void setRainfall(float rainfall) {
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
