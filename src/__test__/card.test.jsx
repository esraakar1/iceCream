import { render, screen } from "@testing-library/react";
import { useDispatch } from "react-redux";
import Card from "../components/list/card";
import { mockData } from "../utils/constants";
import userEvent from "@testing-library/user-event";


jest.mock("react-redux", () => ({
    useDispatch: jest.fn(),
}));

describe("Card Testler", () => {
    const dispatchMock = jest.fn();

      //   her testin öncesinde useDispatch in sahte dispatch i döndüreceğini söyle
    beforeEach(() => {
        useDispatch.mockReturnValue(dispatchMock);
    });

    // her testin sonrasında bütün moskları sıfırla
    afterEach(() => {
        jest.clearAllMocks();
    });

 it("item propuna göre detaylar doğru şekilde ekrana basılır", () => {
      render(<Card item={mockData[0]}/>);

      screen.getByRole("heading", {name: "Bal Badem" });
      screen.getByText("₺25 / top");

      const img = screen.getByRole("img");
      expect(img).toHaveAttribute("src", "/ice-1.png");
 });

 it("tipin seçili olma durumuna göre buton görünürlüğü değişir", async () => {
       userEvent.setup();
       
    // card bileşenini renderla
       render(<Card item={mockData[0]}/>);

    // sepet ekle butonunu al
         const basketBtn = screen.getByRole("button", {name: /sepete/i});

         expect(basketBtn).toHaveClass("invisible");

        //  külahta butonunu al
        const cornetBtn = screen.getByRole("button", {name: /külahta/i});

        // külahta butonuna tıkla
        await userEvent.click(cornetBtn);
      
        // sepete ekle butonu görünür
        expect(basketBtn).not.toHaveClass("invisible");

        // külahta butonuna tıkla
        await userEvent.click(cornetBtn);

        // sepete ekle butonu kaybolur
        expect(basketBtn).toHaveClass("invisible");

 });

 it("sepete ekle butonuna tıklanınca aksiyon dispatch edilir", () => {});
});