## Phase 6 (Deployment Plan)

------------------------------------------------------------------ 

### Deployment

The machine learning models for predicting car prices and days on market will be made available for stakeholders to use as a service. The service will be helpful for car dealerships when listing new cars for sale by estimating a suitable price and a timeframe of how many days the car will likely stay on the market. Feature importance information can also help explain certain predictions.

To deploy the models, we create an application that loads our machine learning models and provides predictions through an interface. The application is in a container so it runs the same everywhere. This container is hosted on a server so the service stays available at all times. Model files and preprocessing tools are stored with version control. A simple user interface is needed for the application to provide a convenient user experience.

------------------------------------------------------------------ 

### Monitoring

After deployment, it is important to make sure the service is up and running at all times. Monitoring will include checking that the application is online, predictions remain accurate and the responses to requests work and are fast enough. We also track system data, such as CPU, memory and storage.

A logging system is needed to record incoming requests, prediction outputs and errors. Alerts are triggered when errors or problems occur, such as repeated failures or slow response times.

------------------------------------------------------------------ 

### Maintenance

Maintenance ensures that the machine learning system keeps working over time. The model must be retrained with new data so it doesn't become outdated and can learn from accurate real life data. All previous models will be saved so that rollback is possible if needed. Before retraining the model, the dataset must be updated first. New data will be collected and updated regularly.

Documentation will be done with every change to the system so that it is easy for programmers and stakeholders to understand. User feedback is collected and reviewed for future improvements. Security updates, bug fixes and other improvements will be applied.
