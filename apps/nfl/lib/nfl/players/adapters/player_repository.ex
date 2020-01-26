defmodule Nfl.Players.PlayerRepository do
  defmodule Behaviour do
    @moduledoc false

    @callback all() :: [Nfl.Players.Player.t]
  end
  @behaviour Behaviour

  alias Nfl.Players.Player

  @data_filename "rushing.json"

  def all do
    :code.priv_dir(:nfl)
    |> Path.join(@data_filename)
    |> File.read!()
    |> Jason.decode!()
    |> Enum.map(&load_player/1)
  end

  defp load_player(json_player_data) do
    %Player{
      name: json_player_data["Player"],
      team: json_player_data["Team"],
      pos: json_player_data["Pos"],
      att: json_player_data["Att"],
      att_g: json_player_data["Att/G"],
      yds: json_player_data["Yds"],
      avg: json_player_data["Avg"],
      yds_g: json_player_data["Yds/G"],
      td: json_player_data["TD"],
      lng: json_player_data["Lng"],
      first: json_player_data["1st"],
      first_percent: json_player_data["1st%"],
      val_20p: json_player_data["20+"],
      val_40p: json_player_data["40+"],
      fum: json_player_data["FUM"]
    }
  end
end
