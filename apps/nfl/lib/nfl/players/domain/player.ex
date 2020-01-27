defmodule Nfl.Players.Player do
  @derive Jason.Encoder
  defstruct [
    :name,
    :team,
    :pos,
    :att,
    :att_g,
    :yds,
    :avg,
    :yds_g,
    :td,
    :lng,
    :first,
    :first_percent,
    :val_20p,
    :val_40p,
    :fum
  ]
end
