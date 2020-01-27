defmodule Web.PageViewTest do
  use Web.ConnCase, async: true
  alias Web.PageView
  alias Nfl.Players.Player

  test "displays a player" do
    player = %Player{
	name: ":name:",
	att: 2,
	att_g: 2,
	avg: 3.5,
	first: 4,
	first_percent: 5,
	fum: 6,
	lng: "7",
	pos: ":pos:",
	td: 8,
	team: ":team:",
	val_20p: 9,
	val_40p: 10,
	yds: 11,
	yds_g: 12
      }


    page =
      Phoenix.View.render_to_string(PageView, "index.html",
        players: [player]
      )

    assert node_text(page, type: "name") == ":name:"
    assert node_text(page, type: "team") == ":team:"
    assert node_text(page, type: "att") == "2"
    assert node_text(page, type: "att_g") == "2"
    assert node_text(page, type: "avg") == "3.5"
    assert node_text(page, type: "first") == "4"
    assert node_text(page, type: "first_percent") == "5"
    assert node_text(page, type: "fum") == "6"
    assert node_text(page, type: "lng") == "7"
    assert node_text(page, type: "pos") == ":pos:"
    assert node_text(page, type: "td") == "8"
    assert node_text(page, type: "val_20p") == "9"
    assert node_text(page, type: "val_40p") == "10"
    assert node_text(page, type: "yds") == "11"
    assert node_text(page, type: "yds_g") == "12"
  end

  defp node(page, queries) do
    Enum.reduce(queries, page, fn {key, val}, document ->
      document
      |> Floki.parse_document!()
      |> Floki.find("[data-#{key}='#{val}']")
    end)
  end

  defp node_text(page, queries) do
    page
    |> node(queries)
    |> Floki.text()
  end
end
