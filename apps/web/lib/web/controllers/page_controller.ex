defmodule Web.PageController do
  use Web, :controller

  def index(conn, _params) do
    render(conn, "index.html", players: Nfl.PlayerRepository.all)
  end
end
