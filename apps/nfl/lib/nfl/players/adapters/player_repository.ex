defmodule Nfl.Players.PlayerRepository do
  defmodule Behaviour do
    @moduledoc false

    @callback all() :: [Nfl.Players.Player.t]
  end
  @behaviour Behaviour

  alias Nfl.Players.Player

  def all do
      %Player{
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
      |> List.wrap()
  end
end
