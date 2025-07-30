import { render, screen } from "@testing-library/react";
import CartInfo from "../components/modal/cart-info";
import userEvent from "@testing-library/user-event";
import { useDispatch } from "react-redux";

// createOrder action'ını mock'la
jest.mock("../redux/cartSlice", () => ({
  createOrder: () => ({ type: "cart/createOrder" }),
}));

// toast.success fonksiyonunu mock'la
jest.mock("react-toastify", () => ({
  toast: {
    success: jest.fn(),
  },
}));

// useDispatch'i mock'la
const mockDispatch = jest.fn();
jest.mock("react-redux", () => ({
  useDispatch: () => mockDispatch,
}));

// createOrder action'ını ayrıca import ediyoruz
import { createOrder } from "../redux/cartSlice";
import { toast } from "react-toastify";

describe("CartInfo - Dinamik Kısımlar", () => {
  const mockClose = jest.fn();

  const renderComponent = (cart) =>
    render(<CartInfo cart={cart} close={mockClose} />);

  it("doğru subtotal, shipping ve total değerlerini gösterir", () => {
    const cart = [
      { id: 1, name: "Ürün A", price: 40, amount: 2 }, // 80₺
      { id: 2, name: "Ürün B", price: 15, amount: 1 }, // 15₺
    ];

    renderComponent(cart);

    expect(screen.getByTestId("subtotal").textContent).toBe("95₺ ");
    expect(screen.getByTestId("shipping").textContent).toBe("20₺");
    expect(screen.getByTestId("total").textContent).toBe("115₺ ");
  });

  it("subtotal 100'den büyükse kargo 0₺ olur", () => {
    const cart = [{ id: 1, name: "Ürün X", price: 120, amount: 1 }]; // 120₺

    renderComponent(cart);

    expect(screen.getByTestId("subtotal").textContent).toBe("120₺ ");
    expect(screen.getByTestId("shipping").textContent).toBe("0₺");
    expect(screen.getByTestId("total").textContent).toBe("120₺ ");
  });

  it("Sipariş Ver butonuna tıklanınca dispatch, toast ve close çalışır", async () => {
    const cart = [{ id: 1, name: "Ürün Y", price: 50, amount: 1 }];
    
    const user = userEvent.setup();

    renderComponent(cart);

    const button = screen.getByRole("button", { name: /sipariş ver/i });

    await user.click(button);

    // Redux action dispatch edildi mi?
    expect(mockDispatch).toHaveBeenCalledWith(createOrder());

    // Toast mesajı gösterildi mi?
    expect(toast.success).toHaveBeenCalledWith("Ürünler Hazırlanıyor");

    // close fonksiyonu çağrıldı mı?
    expect(mockClose).toHaveBeenCalled();
  });
});
