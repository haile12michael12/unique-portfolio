{
  "name": "Supporter",
  "type": "object",
  "properties": {
    "name": {
      "type": "string",
      "description": "Supporter's display name"
    },
    "email": {
      "type": "string",
      "description": "Supporter's email address"
    },
    "amount": {
      "type": "number",
      "description": "Amount supported in USD"
    },
    "method": {
      "type": "string",
      "enum": [
        "coffee",
        "github_sponsors",
        "paypal",
        "bank_transfer"
      ],
      "description": "Support method used"
    },
    "message": {
      "type": "string",
      "description": "Optional message from supporter"
    },
    "is_public": {
      "type": "boolean",
      "default": true,
      "description": "Whether to show in recent supporters list"
    }
  },
  "required": [
    "name",
    "email",
    "amount",
    "method"
  ]
}