import React from 'react';
import { BadgeCheck, MapPin, Clock, Zap, CreditCard, Package, FileText, ShoppingBag, ArrowRightLeft } from 'lucide-react';
import { Review, Stat, Badge, FaqItem, ServiceItem } from './types';

// Phone number for WhatsApp actions (example placeholder)
export const PHONE_NUMBER = "5511999999999"; 
export const PIX_KEY = "marcos.l33T.moto@exemplo.com";

export const REVIEWS: Review[] = [
  {
    id: 1,
    name: "Lucas R.",
    rating: 5,
    text: "Entrega rápida demais! Chegou antes do tempo."
  },
  {
    id: 2,
    name: "Carla M.",
    rating: 5,
    text: "O cara é brabo! Salvou minha entrega no sufoco."
  },
  {
    id: 3,
    name: "Roberto S.",
    rating: 5,
    text: "Profissional de confiança. Recomendo de olhos fechados."
  }
];

export const STATS: Stat[] = [
  { label: "Agendamentos", value: "389" },
  { label: "Clientes Fixos", value: "97" },
  { label: "Avaliações", value: "312" }
];

export const BADGES: Badge[] = [
  { icon: <BadgeCheck className="w-5 h-5 text-vr46-yellow" />, text: "Profissional Verificado" },
  { icon: <MapPin className="w-5 h-5 text-vr46-yellow" />, text: "Endereço Confirmado" },
  { icon: <Zap className="w-5 h-5 text-vr46-yellow" />, text: "Rotas Urgentes" },
  { icon: <Clock className="w-5 h-5 text-vr46-yellow" />, text: "Trabalha Feriado" },
  { icon: <CreditCard className="w-5 h-5 text-vr46-yellow" />, text: "Aceita Pix" },
];

export const SERVICES: ServiceItem[] = [
  {
    id: 'express',
    title: 'Entrega Expressa',
    description: 'Levou, chegou. Ponto A para Ponto B o mais rápido possível.',
    priceLabel: 'A partir de R$ 15,00',
    message: 'Olá Marcos! Preciso de uma *Entrega Expressa*. Pode calcular?',
    icon: <Zap className="w-6 h-6 text-vr46-blue" />
  },
  {
    id: 'docs',
    title: 'Docs e Cartório',
    description: 'Assinaturas, filas de cartório, correios e bancos.',
    priceLabel: 'Orçamento por hora',
    message: 'Olá! Preciso de serviço de *Cartório/Documentos*.',
    icon: <FileText className="w-6 h-6 text-vr46-blue" />
  },
  {
    id: 'ecommerce',
    title: 'Coleta E-commerce',
    description: 'Retirada de produtos em lojas ou centros de distribuição.',
    priceLabel: 'Pacotes mensais',
    message: 'Fala Marcos! Quero ver sobre *Coletas para minha Loja*.',
    icon: <Package className="w-6 h-6 text-vr46-blue" />
  },
  {
    id: 'buy',
    title: 'Compras Rápidas',
    description: 'Farmácia, peças de moto, comida ou conveniência.',
    priceLabel: 'Taxa + Valor do Item',
    message: 'Preciso que faça uma *Compra Rápida* pra mim.',
    icon: <ShoppingBag className="w-6 h-6 text-vr46-blue" />
  },
  {
    id: 'return',
    title: 'Leva e Traz',
    description: 'Esqueceu a chave? Precisa buscar algo e trazer de volta.',
    priceLabel: 'Cobrado por KM',
    message: 'Preciso de um serviço de *Leva e Traz*.',
    icon: <ArrowRightLeft className="w-6 h-6 text-vr46-blue" />
  }
];

export const FAQ_ITEMS: FaqItem[] = [
  {
    question: "Atende quais regiões?",
    answer: "Principalmente Zona Sul e Centro. Para outras regiões ou cidades vizinhas, consulte disponibilidade e taxa de deslocamento no WhatsApp."
  },
  {
    question: "Faz entrega com chuva?",
    answer: "Sim! Trabalho com capa e baú impermeável. Em dias de chuva forte, o tempo de entrega pode aumentar levemente por segurança."
  },
  {
    question: "Aceita quais formas de pagamento?",
    answer: "Aceito Pix (preferencial), Dinheiro e Cartão de Crédito/Débito (maquininha). Para empresas, podemos fechar quinzenal."
  },
  {
    question: "Transporta objetos frágeis?",
    answer: "Sim, tenho baú acolchoado e extensores. Mas é importante avisar na hora de solicitar para eu acomodar da melhor forma."
  }
];