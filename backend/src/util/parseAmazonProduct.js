const puppeteer = require('puppeteer');

module.exports = async function parseAmazon(req, res) {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  const product = req.query.product;

  try {
    await page.goto('https://www.amazon.com.br/', { waitUntil: 'domcontentloaded' });

    // Digita o nome do produto
    await page.type('#twotabsearchtextbox', product);

    // Clica em "Buscar" e espera a navegação
    await Promise.all([
      page.click('input.nav-input[type="submit"]'),
      page.waitForNavigation({ waitUntil: 'domcontentloaded' }),
    ]);

    const resultados = await page.evaluate(() => {
      const produtos = [];
      const items = document.querySelectorAll('div.s-main-slot > div[data-component-type="s-search-result"]');

      items.forEach(item => {
        const nome = item.querySelector('h2 span')?.textContent.trim() || 'Sem nome';

        const precoInteiro = item.querySelector('.a-price .a-price-whole')?.textContent.trim() || '';
        const precoDecimal = item.querySelector('.a-price .a-price-fraction')?.textContent.trim() || '';
        const preco = precoInteiro ? `R$ ${precoInteiro},${precoDecimal}` : 'Sem preço';

        // Seletor atualizado para pegar o link correto
        const linkRelativo = item.querySelector('a.a-link-normal.s-no-outline')?.getAttribute('href')
          || item.querySelector('a')?.getAttribute('href')
          || '';

        const linkCompleto = linkRelativo ? `https://www.amazon.com.br${linkRelativo}` : 'Sem link';

        const imagem = item.querySelector('img.s-image')?.getAttribute('src') || 'Sem imagem';

        produtos.push({ nome, preco, link: linkCompleto, imagem });
      });

      return produtos.slice(0, 5); // Retorna os 5 primeiros produtos
    });

    await browser.close();

    return res.status(200).json({
      data: resultados
    });

  } catch (erro) {
    await browser.close();
    return res.status(500).json({
      error: erro.message || 'Erro inesperado ao buscar na Amazon'
    });
  }
};
