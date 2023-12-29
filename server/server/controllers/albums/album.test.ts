import { getAllAlbums, addAlbum, deleteAlbum } from "./albums";

const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const supertest = require('supertest');

jest.mock('axios');

const app = express();
app.use(bodyParser.json());
app.get('/albums', getAllAlbums);
app.post('/albums', addAlbum);
app.delete('/albums/:id', deleteAlbum);

const request = supertest(app);

describe('API Tests', () => {
  describe('getAllAlbums', () => {
    it('should return all albums', async () => {
      const mockData = [{ id: 1, title: 'Album 1' }];
      axios.get.mockResolvedValue({ data: mockData });

      const response = await request.get('/albums');
      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockData);
    });
  });

  describe('addAlbum', () => {
    it('should successfully add a new album', async () => {
      const newAlbum = { id: 2, title: 'New Album' };
      axios.post.mockResolvedValue({ data: newAlbum });

      const response = await request.post('/albums').send({ title: 'New Album' });
      expect(response.status).toBe(201);
      expect(response.body).toEqual(newAlbum);
    });

    it('should handle errors when adding an album', async () => {
      axios.post.mockRejectedValue(new Error('Failed to add album'));

      const response = await request.post('/albums').send({ title: 'New Album' });
      expect(response.status).toBe(500);
    });
  });

  describe('deleteAlbum', () => {
    it('should successfully delete an album', async () => {
      axios.delete.mockResolvedValue({});

      const response = await request.delete('/albums/1');
      expect(response.status).toBe(204);
    });

    it('should handle errors when deleting an album', async () => {
      axios.delete.mockRejectedValue(new Error('Failed to delete album'));

      const response = await request.delete('/albums/1');
      expect(response.status).toBe(500);
    });
  });
});