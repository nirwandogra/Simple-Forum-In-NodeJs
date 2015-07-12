var paths = require('../path');
module.exports = function(app) {
    var model = require('model');
    var connection = model.conn;
    var express = require('express'),
        ElasticSearchClient = require('elasticsearchclient'),
        url = require('url');

    var connectionString = 'localhost:9200';

    var serverOptions = {
        host: 'localhost',
        port: 9200,
        secure: false
    };
    //console.log("Usernaem : "+ serverOptions.auth.username);
    //console.log("Password :"+serverOptions.auth.password);
    var elasticSearchClient = new ElasticSearchClient(serverOptions);

    var _index = "sample";
    var _type = 'document';

    // Configuration
    app.get('/search', function(req, res) {
        var qryObj = {
            "query": {
                "query_string": {
                    "query": req.query.q
                }
            }
        };
        if (req.query == undefined || req.query.q == undefined) {
            res.sendFile(paths.search);
        } else {
            elasticSearchClient.search(_index, _type, qryObj)
                .on('data',
                    function(data) {
                        res.send(JSON.parse(data));
                    }).on('error', function(error) {
                    //res.redirect('../search.html');
                    res.send(error);
                })
                .exec();
        }
    });


    app.get('/index', function(req, res) {
        elasticSearchClient.createIndex(_index, {}, {}).on('data',
            function(data) {
                var commands = []
                commands.push({
                    "index": {
                        "_index": _index,
                        "_type": _type,
                        "_id": "1"
                    }
                });
                commands.push({
                    'name': 'Reliability',
                    'text': 'Reliability NIRWAN DOGRA nirwan dogra is improved if multiple ' +
                        'redundant sites are used, which makes well-designed cloud ' +
                        'computing suitable for business continuity and disaster recovery. '
                });

                commands.push({
                    "index": {
                        "_index": _index,
                        "_type": _type,
                        "_id": "2"
                    }
                });
                commands.push({
                    'name': 'Virtualization',
                    'text': 'Virtualization technology allows servers and storage ' +
                        'devices to be shared and utilization be increased. ' +
                        'Applications can be easily migrated from one physical server to another. '
                });

                commands.push({
                    "index": {
                        "_index": _index,
                        "_type": _type,
                        "_id": "3"
                    }
                });
                commands.push({
                    'name': 'Platform as a service',
                    'text': 'Platform as a service (PaaS) is a category of cloud ' +
                        'computing services that provides a computing platform and a solution stack as a service'
                });

                commands.push({
                    "index": {
                        "_index": _index,
                        "_type": _type,
                        "_id": "4"
                    }
                });
                commands.push({
                    'name': 'Infrastructure as a service',
                    'text': 'In the most basic cloud-service model, providers of ' +
                        'IaaS offer computers - physical or (more often) virtual machines - and other resources.'
                });

                //push replyies as text and user id as id;
                // var query = 'select  id,reply from replies';
                // connection.query(query, function(err, rows, fields) {

                //   });
                elasticSearchClient.bulk(commands, {})
                    .on('data', function(data) {
                        res.redirect('/search_page');
                    })
                    .on('error', function(error) {
                        res.send(error);
                    })
                    .exec();
            }).on('error', function(error) {
            res.send(error);
        }).exec();
    })
}