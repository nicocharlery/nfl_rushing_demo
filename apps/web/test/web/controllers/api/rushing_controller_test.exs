defmodule Web.Api.RushingControllerTest do
  use Web.ConnCase

  alias Nfl.Players.Player
  import Mox

  Mox.defmock(
    Web.Api.PlayerRepositoryMock,
    for: Nfl.Players.PlayerRepository.Behaviour
  )

  setup :verify_on_exit!

  test "GET /api/rushings", %{conn: conn} do
    Web.Api.PlayerRepositoryMock
    |> expect(:all, fn ->
      %Player{
	name: ":name:",
	team: ":team:"
      }
    |> List.wrap
    end)

    conn =
      conn
      |> put_private(:player_repository, Web.Api.PlayerRepositoryMock)
      |> get( "/api/rushings")

    results = json_response(conn, 200)
    received_player = List.first(results["players"])
    assert received_player["name"] == ":name:"
    assert received_player["team"] == ":team:"
  end
end
