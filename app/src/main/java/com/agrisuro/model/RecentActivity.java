package com.agrisuro.model;

public class RecentActivity {
    private String title;
    private String description;
    private String timestamp;
    private Type type;

    public enum Type {
        WEATHER,
        ENCYCLOPEDIA,
        EXPENSE
    }

    public RecentActivity(String title, String description, String timestamp, Type type) {
        this.title = title;
        this.description = description;
        this.timestamp = timestamp;
        this.type = type;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(String timestamp) {
        this.timestamp = timestamp;
    }

    public Type getType() {
        return type;
    }

    public void setType(Type type) {
        this.type = type;
    }
}
