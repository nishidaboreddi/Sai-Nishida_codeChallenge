package com.hexaware.cricketTeamManagementSystem.dto;


public class PlayerDTO {

    private Long playerId;

    private String playerName;

    private int jerseyNumber;

    private String role;

    private int totalMatches;

    private String teamName;

    private String countryOrState;

    private String description;
    
    
    public PlayerDTO() {}


	public PlayerDTO(Long playerId, String playerName, int jerseyNumber, String role, int totalMatches, String teamName,
			String countryOrState, String description) {
		super();
		this.playerId = playerId;
		this.playerName = playerName;
		this.jerseyNumber = jerseyNumber;
		this.role = role;
		this.totalMatches = totalMatches;
		this.teamName = teamName;
		this.countryOrState = countryOrState;
		this.description = description;
	}


	public Long getPlayerId() {
		return playerId;
	}


	public void setPlayerId(Long playerId) {
		this.playerId = playerId;
	}


	public String getPlayerName() {
		return playerName;
	}


	public void setPlayerName(String playerName) {
		this.playerName = playerName;
	}


	public int getJerseyNumber() {
		return jerseyNumber;
	}


	public void setJerseyNumber(int jerseyNumber) {
		this.jerseyNumber = jerseyNumber;
	}


	public String getRole() {
		return role;
	}


	public void setRole(String role) {
		this.role = role;
	}


	public int getTotalMatches() {
		return totalMatches;
	}


	public void setTotalMatches(int totalMatches) {
		this.totalMatches = totalMatches;
	}


	public String getTeamName() {
		return teamName;
	}


	public void setTeamName(String teamName) {
		this.teamName = teamName;
	}


	public String getCountryOrState() {
		return countryOrState;
	}


	public void setCountryOrState(String countryOrState) {
		this.countryOrState = countryOrState;
	}


	public String getDescription() {
		return description;
	}


	public void setDescription(String description) {
		this.description = description;
	}


	@Override
	public String toString() {
		return "PlayerDTO [playerId=" + playerId + ", playerName=" + playerName + ", jerseyNumber=" + jerseyNumber
				+ ", role=" + role + ", totalMatches=" + totalMatches + ", teamName=" + teamName + ", countryOrState="
				+ countryOrState + ", description=" + description + "]";
	}
    
    
    
}