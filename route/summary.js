const express = require('express');
const router = express.Router();
const Requirement = require('../models/Requirement');
const { Op } = require('sequelize');

// requirements summary for dashboard
router.get('/', (req, res) => {
    let query = req.body.employee_data.is_hr
        ? {}
        : {
              where: {
                  emp_id: {
                      [Op.eq]: req.body.employee_data.emp_id,
                  },
              },
          };

    const totalRequirements = Requirement.count(query)
        .then((data) => {
            return data;
        })
        .catch((err) => {
            console.log(err);
        });

    query = req.body.employee_data.is_hr
        ? {
              where: {
                  status: {
                      [Op.eq]: 1,
                  },
              },
          }
        : {
              where: {
                  status: {
                      [Op.eq]: 1,
                  },
                  emp_id: {
                      [Op.eq]: req.body.employee_data.emp_id,
                  },
              },
          };

    const openRequirement = Requirement.count(query)
        .then((data) => {
            return data;
        })
        .catch((err) => {
            console.log(err);
        });

    query = req.body.employee_data.is_hr
        ? {
              where: {
                  status: {
                      [Op.eq]: 2,
                  },
              },
          }
        : {
              where: {
                  status: {
                      [Op.eq]: 2,
                  },
                  emp_id: {
                      [Op.eq]: req.body.employee_data.emp_id,
                  },
              },
          };

    const resolvedRequirement = Requirement.count(query)
        .then((data) => {
            return data;
        })
        .catch((err) => {
            console.log(err);
        });

    Promise.all([totalRequirements, openRequirement, resolvedRequirement])
        .then((response) => {
            res.status(200).json({
                status: 'success',
                message: 'Data retrieved successfully',
                data: {
                    totalRequirements: response[0],
                    openRequirement: response[1],
                    resolvedRequirement: response[2],
                },
            });
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({
                status: 'error',
                message: 'error occurred with promise',
                data: {},
            });
        });
});

module.exports = router;
