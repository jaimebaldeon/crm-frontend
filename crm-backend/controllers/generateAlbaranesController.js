const { getContractsByMonth, getClientByContract, getClientAssets, generateAlbaranDocument, deriveMaintenance } = require('../services/albaranesService');


exports.generateAlbaranes = async (req, res) => {
    const month = req.query.month;
  
    try {
      // Fetch contracts for the specified month from the database
      const contracts = await getContractsByMonth(month);
  
      // Filter contracts based on specific criteria (CON ALBARANES NO ACEPTADOS)
    //   const filteredContracts = contracts.filter(contract => {
    //     // Example filter condition: contracts with a start date within the specified month
    //     return contract.mes === month;
    //   });
      filteredContracts = contracts
    
      const clientsWithoutAssets = [];
      
      // Generate and save albaran documents for each filtered contract
      for (const contract of filteredContracts) {
        const client = await getClientByContract(contract)
        const activosCliente = await getClientAssets(client)

        if (activosCliente.length === 0) {
            // Add client name to notification list if no assets are found
            clientsWithoutAssets.push(client.name); // Assuming client.name holds the client’s name
            console.log(`Skipping albaran generation for ${client.name} due to lack of assets.`);
            continue; // Skip to the next contract in the loop
        }
        
        // Derive products and services from client assets
        const { productosServiciosCounter, saltarAlbaran } = await deriveMaintenance(activosCliente, [], [])

        if (saltarAlbaran) {
            console.log(`Skipping albaran for ${client.name} due to missing or incorrect data.`);
            continue;
        }
        
        // Generate albaran for clients with assets
        await generateAlbaranDocument(contract, client, activosCliente, productosServiciosCounter);
      }

      // Notify which clients have no assets after the loop
      if (clientsWithoutAssets.length > 0) {
            console.log('Albaran generation completed. The following clients have no assets:');
            clientsWithoutAssets.forEach(clientName => console.log(`- ${clientName}`));
      } 
  
      res.status(200).json({ message: `Albaranes for ${month} generated successfully.` });
    } catch (error) {
      console.error('Error generating albaranes:', error);
      res.status(500).json({ message: 'Failed to generate albaranes.' });
    }
  };
  