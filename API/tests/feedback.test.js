import request from 'supertest'
import { describe, it, expect, beforeAll, afterAll } from 'vitest'
import mongoose from 'mongoose'

let app
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/test-db'

beforeAll(async () => {
  const mod = await import('../server.js') // <-- dynamic import
  app = mod.default || mod
  await mongoose.connect(MONGO_URI)
})

afterAll(async () => {
  await mongoose.connection.close()
})

describe('Feedback Routes', () => {
  it('GET /api/feedbacks should return array of feedbacks', async () => {
    const res = await request(app).get('/api/feedbacks')
    expect(res.status).toBe(200)
    expect(Array.isArray(res.body)).toBe(true)
  })

  it('POST /api/feedbacks should create new feedback', async () => {
    const feedback = {
      text: 'This is a test feedback.',
      category: 'Autre',
    }
    const res = await request(app).post('/api/feedbacks').send(feedback)
    expect(res.status).toBe(200)
    expect(res.body).toHaveProperty('feedback')
    expect(res.body.feedback.text).toBe(feedback.text)
  })

  it('POST /api/feedbacks should fail with missing fields', async () => {
    const res = await request(app).post('/api/feedbacks').send({})
    expect(res.status).toBe(500)
  })
})
