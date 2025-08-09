import React, { useState, useEffect } from 'react';
import api from '../../../services/api';
import Button from '../../../components/UI/Button/Button';
import Input from '../../../components/UI/Input/Input';
import Modal from '../../../components/UI/Modal/Modal';

const ProductsPage = () => {
    const [products, setProducts] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [formData, setFormData] = useState({ name: '', description: '', price: '' });

    useEffect(() => {
        fetchProducts();
    }, []);

    useEffect(() => {
        if (selectedProduct) {
            setFormData({
                name: selectedProduct.name,
                description: selectedProduct.description,
                price: selectedProduct.price,
            });
        } else {
            setFormData({ name: '', description: '', price: '' });
        }
    }, [selectedProduct]);

    const fetchProducts = async () => {
        const response = await api.get('/products', {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        setProducts(response.data);
    };

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFormData({ ...formData, [id]: value });
    };

    const handleSave = async () => {
        if (selectedProduct) {
            await api.put(`/products/${selectedProduct.id}`, formData, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
        } else {
            await api.post('/products', formData, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
        }
        fetchProducts();
        setShowModal(false);
        setSelectedProduct(null);
    };

    const handleDelete = async (id) => {
        await api.delete(`/products/${id}`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        fetchProducts();
    };

    return (
        <div>
            <h1>Produtos</h1>
            <Button onClick={() => setShowModal(true)}>Adicionar Produto</Button>
            <table>
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Descrição</th>
                        <th>Preço</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map(product => (
                        <tr key={product.id}>
                            <td>{product.name}</td>
                            <td>{product.description}</td>
                            <td>{product.price}</td>
                            <td>
                                <Button onClick={() => { setSelectedProduct(product); setShowModal(true); }}>Editar</Button>
                                <Button onClick={() => handleDelete(product.id)}>Deletar</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {showModal && (
                <Modal onClose={() => { setShowModal(false); setSelectedProduct(null); }}>
                    <h2>{selectedProduct ? 'Editar Produto' : 'Adicionar Produto'}</h2>
                    <Input id="name" type="text" placeholder="Nome" value={formData.name} onChange={handleInputChange} />
                    <Input id="description" type="text" placeholder="Descrição" value={formData.description} onChange={handleInputChange} />
                    <Input id="price" type="number" placeholder="Preço" value={formData.price} onChange={handleInputChange} />
                    <Button onClick={handleSave}>Salvar</Button>
                </Modal>
            )}
        </div>
    );
};

export default ProductsPage;