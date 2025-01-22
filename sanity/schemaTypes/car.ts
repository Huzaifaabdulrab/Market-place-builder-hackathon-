export const car = {
    name: 'car',
    type: 'document',
    title: 'Car',
    fields: [
      {
        name: 'id',
        type: 'number'  ,
        title: 'Car ID',
        description: 'Unique identifier for the car from the API',
      },
      {
        name: 'name',
        type: 'string',
        title: 'Car Name',
        description: 'Name of the car (e.g., Koenigsegg)',
      },
      {
        name: 'type',
        type: 'string',
        title: 'Car Type',
        description: 'Type of the car (e.g., Sport, Sedan, SUV, etc.)',
      },
      {
        name: 'fuelCapacity',
        type: 'string',
        title: 'Fuel Capacity',
        description: 'Fuel capacity or battery capacity (e.g., 90L, 100kWh)',
      },
      {
        name: 'transmission',
        type: 'string',
        title: 'Transmission',
        description: 'Type of transmission (e.g., Manual, Automatic)',
      },
      {
        name: 'seatingCapacity',
        type: 'string',
        title: 'Seating Capacity',
        description: 'Number of seats (e.g., 2 People, 4 seats)',
      },
      {
        name: 'pricePerDay',
        type: 'string',
        title: 'Price Per Day',
        description: 'Rental price per day (e.g., $99.00)',
      },
      {
        name: 'image',
        type: 'image',
        title: 'Car Image',
        options: {
          hotspot: true,
        },
        description: 'Image of the car',
      },
      {
        name: 'originalPrice',
        type: 'string',
        title: 'Original Price',
        description: 'Original price before discount (if applicable)',
      },
  
      {
        name: 'tags',
        type: 'array',
        title: 'Tags',
        of: [{ type: 'string' }],
        options: {
          layout: 'tags',
        },
        description: 'Tags for categorization (e.g., popular)',
      },
    ],
  };
  