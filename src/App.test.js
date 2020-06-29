import React from 'react'
import { render, screen, getByText } from '@testing-library/react'
import App from './App'

test('Renderiza texto Chotuve', () => {
  const mensaje = 'Bienvenidos a Chotuve'

  const { container, getByText } = render(<App />)
  expect(getByText(mensaje)).toBeInTheDocument()
})
