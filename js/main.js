// Dependency: vendor/mustache-3.0.1.min.js

function getRemoteJSON(url) {
	return fetch(url).then(data => data.json())
}

function getHtmlFromElement(id) {
	return (document.getElementById(id) || {}).innerHTML || ""
}

function setHtmlInElement(id, html) {
	(document.getElementById(id) || {}).innerHTML = html
}

function showLoadingIndicator() {
	const template = getHtmlFromElement("template-loading")
	setHtmlInElement("loading", template)
	setHtmlInElement("victory-team", "")
	setHtmlInElement("defeat-team", "")
}

function hideLoadingIndicator() {
	setHtmlInElement("loading", "")
}

function getVictoryTeam(teams) {
	return teams.reduce((prevTeam, currTeam) => currTeam.isWinner ? currTeam : prevTeam, {})
}

function getDefeatTeam(teams) {
	return teams.reduce((prevTeam, currTeam) => !currTeam.isWinner ? currTeam : prevTeam, {})
}

function commaSeparateThousandsInNum(number) {
	return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}

function formatTeamData(team) {
	const participants = team.participants || []
	team.participants = participants.map(participant => {
		participant.totalScore = commaSeparateThousandsInNum(participant.totalScore)
		return participant
	})
	return team
}

function populateTemplates(data) {
	const template = getHtmlFromElement("template-table")
	const teams = data.teams || []
	const victoryTeam = formatTeamData(getVictoryTeam(teams) || {})
	const defeatTeam = formatTeamData(getDefeatTeam(teams) || {})
	const populatedVictoryTeamHtml = Mustache.to_html(template, victoryTeam)
	const populatedDefeatTeamHtml = Mustache.to_html(template, defeatTeam)

	setHtmlInElement("victory-team", populatedVictoryTeamHtml)
	setHtmlInElement("defeat-team", populatedDefeatTeamHtml)
}

function load(game) {
	showLoadingIndicator()
	getRemoteJSON("http://192.168.1.90:3000/game/" + (game || "1")).then(data => {
		populateTemplates(data)
		hideLoadingIndicator()
	})
}

function handleGameLinksClick(e) {
	if (e.target.className.indexOf("js-game-list-item") >= 0) {
		const game = e.target.getAttribute("data-game")
		const allListItems = document.getElementsByClassName("js-game-list-item")
		Array.prototype.map.call(allListItems, listItem => {
			listItem.className = listItem.className.replace(/\sgame-list-item-selected/g, "")
		})
		e.target.className += " game-list-item-selected"
		load(game)
	}
}

function connectGameLinks() {
	window.addEventListener("click", handleGameLinksClick, false)
}

(function() {
	connectGameLinks()
	load("1")
}())
