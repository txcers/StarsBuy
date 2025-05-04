import { useState } from 'react';
import './CryptoTracker.css';

const CryptoPriceTracker = () => {
  // Состояния
  const [conversionData, setConversionData] = useState({
    inputValue: '',
    mode: 'rub',
    converted: null,
    difference: null
  });

  // Константы
  const CONFIG = {
    fixedStarPrice: 1.6 // фиксированная цена 1 STAR = 1.6 RUB
  };

  // Конвертация значений
  const convertValue = () => {
    const { inputValue, mode } = conversionData;
    
    if (!inputValue) return;
    
    const numericValue = Number(inputValue);
    if (isNaN(numericValue)) return;

    const convertedValue = mode === 'rub' 
      ? numericValue / CONFIG.fixedStarPrice 
      : numericValue * CONFIG.fixedStarPrice;
    
    const difference = 0;

    setConversionData(prev => ({ 
      ...prev, 
      converted: convertedValue.toFixed(2),
      difference: difference.toFixed(2)
    }));
  };

  // Смена режима
  const changeMode = (mode) => {
    setConversionData({
      inputValue: '',
      mode,
      converted: null,
      difference: null
    });
  };

  // Обработчик изменения инпута
  const handleInputChange = (e) => {
    setConversionData(prev => ({
      ...prev,
      inputValue: e.target.value,
      converted: null,
      difference: null
    }));
  };
  const getTelegramMessage = () => {
    if (mode === 'rub' && inputValue && converted) {
      return `Добрый день, хочу у вас купить ${converted} звезд за ${inputValue} рублей`;
    } else if (mode === 'stars' && inputValue && converted) {
      return `Добрый день, хочу у вас купить ${inputValue} звезд за ${converted} рублей`;
    }
    return "Добрый день, хочу у вас купить звёзды";
  };

  const { mode, inputValue, converted } = conversionData;

  return (
    <div className="crypto-tracker">
      <header>
        <h1>Star Converter</h1>
        <p className="subtitle">Convert between RUB and Stars</p>
      </header>

      <div className="converter-container">
        <div className="mode-selector">
          <button 
            className={`mode-btn ${mode === 'rub' ? 'active' : ''}`}
            onClick={() => changeMode('rub')}
          >
            RUB → Stars
          </button>
          <button 
            className={`mode-btn ${mode === 'stars' ? 'active' : ''}`}
            onClick={() => changeMode('stars')}
          >
            Stars → RUB
          </button>
        </div>

        <div className="input-group">
          <input
            placeholder={mode === 'rub' ? 'Amount in RUB...' : 'Amount in Stars...'}
            value={inputValue}
            onChange={handleInputChange}
            type="number"
            className="amount-input"
          />
          <button 
            onClick={convertValue}
            className="convert-btn"
            disabled={!inputValue}
          >
            Convert
          </button>
        </div>

        {converted !== null && (
          <div className="results">
            {mode === 'rub' ? (
              <>
                <div className="result-card fixed">
                  <h3>Fixed Rate</h3>
                  <p className="result-value">
                    {inputValue} ₽ = <strong>{converted}</strong> stars (1.6₽ each)
                  </p>
                </div>
              </>
            ) : (
              <>
                <div className="result-card fixed">
                  <h3>Fixed Rate</h3>
                  <p className="result-value">
                    {inputValue} stars = <strong>{converted}</strong> ₽ (1.6₽ each)
                  </p>
                </div>
              </>
            )}
          </div>
        )}
      </div>

      <div className="price-info">
        <div className="info-card">
          <h3>Fixed Rate</h3>
          <p>1 Star = {CONFIG.fixedStarPrice} ₽</p>
          
          <div className="order-section">
            <h3>Хотите сделать заказ?</h3>
            <a 
              href={`https://t.me/txcvrs?text=${encodeURIComponent(getTelegramMessage())}`}
              target="_blank" 
              rel="noopener noreferrer"
              className="telegram-link"
            >
              Написать в Telegram
            </a>
            <p className="order-description">
              Нажмите на ссылку выше, чтобы перейти в наш Telegram-бот и оформить заказ
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CryptoPriceTracker;