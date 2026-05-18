{
  "name": "Subscriber",
  "type": "object",
  "properties": {
    "email": {
      "type": "string",
      "description": "Subscriber's email address"
    },
    "source": {
      "type": "string",
      "default": "portfolio",
      "description": "Where they subscribed from"
    }
  },
  "required": [
    "email"
  ]
}