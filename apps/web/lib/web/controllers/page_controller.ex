defmodule Web.PageController do
  use Web, :controller

  def index(conn, _params) do
    render(
      conn,
      "index.html",
      players: player_repository(conn).all
    )
  end

  defp player_repository(conn) do
    Map.get(conn.private, :player_repository, Nfl.Players.PlayerRepository)
  end
end
