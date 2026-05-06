export default function ProductCard({ product, add }) {
  return (
    <div>
      <img src={product.image} width="200" />
      <h3>{product.name}</h3>
      <p>R$ {product.price}</p>
      <button onClick={() => add(product)}>
        Adicionar
      </button>
    </div>
  );
}