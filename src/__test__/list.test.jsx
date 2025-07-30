import { render, screen, waitFor } from "@testing-library/react";
import List from "../components/list";
import api from "../utils/api";
import { mockData } from "../utils/constants";
import Card from "../components/list/card";

// api modülünü mockla
jest.mock("../utils/api");

// card.jsx bileşeni içerisinde provider/router gibi bağımlılıkları kullandığımızda ve bu bağımlılıkların list bileşenin testlerine etki etmesini istemediğimizden card ı mockla
jest.mock("../components/list/card");

describe("List bileşen testleri", () => {
    // her testin öncesinde mockları temizle
     beforeEach(() => {
        jest.clearAllMocks();
     });

    it("api'dan cevabına göre Loader renderlanır", async () => {
        api.get.mockResolvedValueOnce({ data: [] });

        render(<List />)

        // ekranda loader vardır
        screen.getByTestId("list-loader");

        // belirli bir sürenin ardından ekrandan loader gider
        await waitFor(() => {
            expect(screen.queryByTestId("list-loader")).toBeNull();
        });
    });

    it("api dan error cevabı gelirse ekrana error basılır", async () => {
        const errMsg = "Bağlantı zaman aşımına uğradı";
        api.get.mockRejectedValueOnce(new Error(errMsg));

        render(<List />);

        // api dan cevap gelince ekrana error comp. basılır
        await waitFor(() => screen.getByTestId("error"));
    });

    it("api dan başarılı cevap gelince ekrana cardlar gelir", async () => {

        Card.mockImplementation(({ item }) => <div>{item.name}</div>);

        api.get.mockResolvedValueOnce({ data: mockData });

       render(<List />);

    // veri gelince dizideki her nesne için ekrana kart basılır
    await waitFor(() => {
      mockData.forEach((item) => {
        screen.getByText(item.name);
      });
    });
  });
});