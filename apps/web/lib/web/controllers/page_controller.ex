defmodule Web.PageController do
  use Web, :controller

  def index(conn, _params) do
    player =
      %{
	name: "Joe Banyard",
	team: "JAX",
	pos: "RB",
	att: 2,
	att_g: 2,
	yds: 7,
	avg: 3.5,
	yds_g: 7,
	td: 0,
	lng: "7",
	first: 0,
	first_percent: 0,
	val_20p: 0,
	val_40p: 0,
	fum: 0
      }
    players = [player]

    render(conn, "index.html", players: players)
  end
end
