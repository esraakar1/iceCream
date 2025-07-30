import { render, screen } from '@testing-library/react';
import CartItem from '../components/modal/cart-item';

// AmountPicker componentini mockla
jest.mock('../components/modal/amount-picker', () => {
  return function MockAmountPicker({ item }) {
    return <div data-testid="amount-picker">AmountPicker - {item.name}</div>;
  };
});

describe('CartItem', () => {
  const mockItem = {
    id: 1,
    name: 'Çikolatalı Dondurma',
    image: '/images/chocolate.jpg',
    type: 'cup',
    price: 15,
    amount: 2
  };

  const mockItemCone = {
    id: 2,
    name: 'Vanilyalı Dondurma',
    image: '/images/vanilla.jpg',
    type: 'cone',
    price: 12,
    amount: 1
  };

  test('item bilgilerini doğru şekilde render eder', () => {
    render(<CartItem item={mockItem} />);
    
    // Ürün adını kontrol et
    expect(screen.getByText('Çikolatalı Dondurma')).toBeInTheDocument();
    
    // Resmi kontrol et
    const image = screen.getByRole('img');
    expect(image).toHaveAttribute('src', '/images/chocolate.jpg');
    expect(image).toHaveClass('w-[80px] md:w-[100px]');
  });

  test('cup tipi için "Bardakta" yazısını gösterir', () => {
    render(<CartItem item={mockItem} />);
    
    expect(screen.getByText('Bardakta')).toBeInTheDocument();
  });

  test('cone tipi için "Külahta" yazısını gösterir', () => {
    render(<CartItem item={mockItemCone} />);
    
    expect(screen.getByText('Külahta')).toBeInTheDocument();
  });

  test('toplam fiyatı doğru hesaplar ve gösterir', () => {
    render(<CartItem item={mockItem} />);
    
    // price * amount = 15 * 2 = 30
    expect(screen.getByText('30₺')).toBeInTheDocument();
  });

  test('farklı fiyat ve miktarla toplam fiyatı doğru hesaplar', () => {
    render(<CartItem item={mockItemCone} />);
    
    // price * amount = 12 * 1 = 12
    expect(screen.getByText('12₺')).toBeInTheDocument();
  });

  test('AmountPicker componentini item ile birlikte render eder', () => {
    render(<CartItem item={mockItem} />);
    
    const amountPicker = screen.getByTestId('amount-picker');
    expect(amountPicker).toBeInTheDocument();
    expect(amountPicker).toHaveTextContent('AmountPicker - Çikolatalı Dondurma');
  });

  test('doğru CSS sınıflarını uygular', () => {
    const { container } = render(<CartItem item={mockItem} />);
    
    // Ana container sınıfları
    const mainDiv = container.firstChild;
    expect(mainDiv).toHaveClass('flex', 'justify-between', 'items-center', 'border-b', 'py-5', 'gap-5');
    
    // Ürün adı sınıfları
    const productName = screen.getByText('Çikolatalı Dondurma');
    expect(productName).toHaveClass('font-semibold', 'text-lg', 'md:text-xl');
    
    // Tip yazısı sınıfları
    const typeText = screen.getByText('Bardakta');
    expect(typeText).toHaveClass('text-gray-500', 'md:text-lg');
    
    // Fiyat sınıfları
    const priceText = screen.getByText('30₺');
    expect(priceText).toHaveClass('text-lg', 'md:text-xl', 'text-end', 'min-w-[70px]', 'font-semibold', 'text-gray-500');
  });

  test('sıfır miktarla toplam fiyatı doğru hesaplar', () => {
    const zeroAmountItem = { ...mockItem, amount: 0 };
    render(<CartItem item={zeroAmountItem} />);
    
    expect(screen.getByText('0₺')).toBeInTheDocument();
  });

  test('ondalıklı fiyatlarla doğru hesaplama yapar', () => {
    const decimalPriceItem = { ...mockItem, price: 15.5, amount: 3 };
    render(<CartItem item={decimalPriceItem} />);
    
    // 15.5 * 3 = 46.5
    expect(screen.getByText('46.5₺')).toBeInTheDocument();
  });
});