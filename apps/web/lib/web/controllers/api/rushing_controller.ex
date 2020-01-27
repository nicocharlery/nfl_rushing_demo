defmodule Web.Api.RushingController do
  use Web, :controller

  def index(conn, _params) do
    json(conn, %{players: player_repository(conn).all })
  end

  defp player_repository(conn) do
    Map.get(conn.private, :player_repository, Nfl.Players.PlayerRepository)
  end
end
