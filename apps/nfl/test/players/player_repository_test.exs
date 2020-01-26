defmodule Nfl.Players.PlayerRepositoryTest do
  use Nfl.DataCase

  alias Nfl.Players.{Player, PlayerRepository}

  describe "loading data" do
    test "loads data" do
      players = PlayerRepository.all()

      expected_player = %Player{
	name: "Joe Banyard",
	att: 2,
	att_g: 2,
	avg: 3.5,
	first: 0,
	first_percent: 0,
	fum: 0,
	lng: "7",
	pos: "RB",
	td: 0,
	team: "JAX",
	val_20p: 0,
	val_40p: 0,
	yds: 7,
	yds_g: 7
      }

      assert expected_player in players
    end
  end
end
